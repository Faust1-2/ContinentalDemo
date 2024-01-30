import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActionEventArgs,
  AgendaService,
  CellClickEventArgs,
  DayService,
  EventSettingsModel,
  MonthService,
  PopupOpenEventArgs,
  RenderCellEventArgs,
  ScheduleComponent,
  WeekService,
  WorkWeekService,
} from '@syncfusion/ej2-angular-schedule';
import { BeforeOpenCloseMenuEventArgs, ContextMenuComponent, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { EventsService } from '@app/events.service';
import { EventMapper, SchedulerEvent } from '@app/utils/event.mapper';
import { closest, isNullOrUndefined, remove, removeClass } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
})
export class DashboardComponent implements OnInit {

  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent | undefined;
  @ViewChild('menuObj') public menuObj: ContextMenuComponent | undefined;
  @ViewChild('toastObj') public toastObj: ToastComponent | undefined;

  public position = { X: 'Right', Y: 'Top' };

  public data: Object = [
    { text: 'Ben', id: '01' },
    { text: 'Gwen', id: '02' },
  ];

  public selectedEventBartenders: { text: string }[] = [];
  public selectedBartendersCalled = '';

  public selectedTarget?: Element;
  public menuItems: MenuItemModel[] = [
    {
      text: 'New Event',
      iconCss: 'e-icons new',
      id: 'Add',
    }, {
      text: 'New Recurring Event',
      iconCss: 'e-icons recurrence',
      id: 'AddRecurrence',
    }, {
      text: 'Today',
      iconCss: 'e-icons today',
      id: 'Today',
    }, {
      text: 'Edit Event',
      iconCss: 'e-icons edit',
      id: 'Save',
    }, {
      text: 'Edit Event',
      id: 'EditRecurrenceEvent',
      iconCss: 'e-icons edit',
      items: [{
        text: 'Edit Occurrence',
        id: 'EditOccurrence',
      }, {
        text: 'Edit Series',
        id: 'EditSeries',
      }],
    }, {
      text: 'Delete Event',
      iconCss: 'e-icons delete',
      id: 'Delete',
    }, {
      text: 'Delete Event',
      id: 'DeleteRecurrenceEvent',
      iconCss: 'e-icons delete',
      items: [{
        text: 'Delete Occurrence',
        id: 'DeleteOccurrence',
      }, {
        text: 'Delete Series',
        id: 'DeleteSeries',
      }],
    },
  ];

  public eventSettings: BehaviorSubject<EventSettingsModel> = new BehaviorSubject<EventSettingsModel>({});

  public editing = false;

  private subscribedEvents: string[] = [];

  constructor(private eventsService: EventsService, private eventMapper: EventMapper) {
    // firstValueFrom(this.eventsService.getSubscribedEvents()).then((events) => {
    //   this.subscribedEvents = events.map((event) => event.id);
    // });
  }

  async ngOnInit() {
    this.eventsService.getEvents().subscribe((events) => {
      this.eventSettings.next({
        dataSource: events.map((event) => this.eventMapper.mapToScheduler(event)),
        ...this.eventSettings,
      });
    });
  }


  onEventRender(args: RenderCellEventArgs) {
    const appointmentId = args.element.getAttribute('data-id')?.split('_')[1];

    if (this.subscribedEvents.includes(appointmentId as string)) {
      (args.element as HTMLElement).style.backgroundColor = 'green';
    } else {
      (args.element as HTMLElement).style.backgroundColor = 'red';
    }
  }

  onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    const newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      removeClass([document.querySelector('.e-selected-cell') as Element], 'e-selected-cell');
    }
    this.scheduleObj?.closeQuickInfoPopup();
    const targetElement: HTMLElement = <HTMLElement>args.event.target;
    if (closest(targetElement, '.e-contextmenu')) {
      return;
    }
    this.selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' +
      '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
    if (isNullOrUndefined(this.selectedTarget)) {
      args.cancel = true;
      return;
    }
    if (this.selectedTarget?.classList.contains('e-appointment')) {
      const eventObj: { [key: string]: Object } = <{
        [key: string]: Object
      }>this.scheduleObj?.getEventDetails(this.selectedTarget);

      this.eventsService.isSubscribedToEvent(eventObj['Id'] as string).subscribe((isSubscribed) => {
        if (isSubscribed) {
          this.menuObj?.hideItems(['Subscribe'], true);
          this.menuObj?.showItems(['Unsubscribe'], true);
        } else {
          this.menuObj?.hideItems(['Unsubscribe'], true);
          this.menuObj?.showItems(['Subscribe'], true);
        }
      });


      if (eventObj['RecurrenceRule']) {
        this.menuObj?.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        this.menuObj?.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
      } else {
        this.menuObj?.showItems(['Save', 'Delete'], true);
        this.menuObj?.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
      }
      return;
    }
    this.menuObj?.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
    this.menuObj?.showItems(['Add', 'AddRecurrence', 'Today'], true);
  }

  onMenuItemSelect(args: MenuEventArgs): void {
    const selectedMenuItem: string | undefined = args.item.id;
    let eventObj: { [key: string]: Object } = {};
    if (this.selectedTarget && this.selectedTarget.classList.contains('e-appointment')) {
      eventObj = <{ [key: string]: Object }>this.scheduleObj?.getEventDetails(this.selectedTarget);
    }

    switch (selectedMenuItem) {
      case 'Today':
        this.scheduleObj!.selectedDate = new Date();
        break;
      case 'Add':
      case 'AddRecurrence':
        const selectedCells: Element[] = this.scheduleObj!.getSelectedElements();
        const activeCellsData: CellClickEventArgs = this.scheduleObj!.getCellDetails(selectedCells.length > 0 ? selectedCells : this.selectedTarget as any);
        if (selectedMenuItem === 'Add') {
          this.scheduleObj?.openEditor(activeCellsData, 'Add');
        } else {
          this.scheduleObj?.openEditor(activeCellsData, 'Add', undefined, 1);
        }
        break;
      case 'Save':
      case 'EditOccurrence':
      case 'EditSeries':
        if (selectedMenuItem === 'EditSeries') {
          eventObj = <{
            [key: string]: Object
          }>new DataManager(this.scheduleObj?.eventsData).executeLocal(new Query().where(this.scheduleObj?.eventFields.id as any, 'equal', eventObj[this.scheduleObj?.eventFields.recurrenceID as any] as string | number))[0];
        }
        this.scheduleObj?.openEditor(eventObj, selectedMenuItem);
        break;
      case 'Delete':
        this.scheduleObj?.deleteEvent(eventObj);
        break;
      case 'DeleteOccurrence':
      case 'DeleteSeries':
        this.scheduleObj?.deleteEvent(eventObj, selectedMenuItem);
        break;
      case 'Subscribe':
        this.eventsService.subscribeToEvent(eventObj['Id'] as string).subscribe((event) => {
          this.toastObj?.show();
          (args.element as HTMLElement).style.backgroundColor = 'green';
          window.location.reload();
        });
        break;
      case 'Unsubscribe':
        this.eventsService.unsubscribeFromEvent(eventObj['Id'] as string).subscribe((event) => {
          console.log('unsubscribed from event %s', event.id);
          (args.element as HTMLElement).style.backgroundColor = 'red';
          window.location.reload();
        });
        break;
    }
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'QuickInfo') {
      args.cancel = true;
    } else {
      if (args.type === 'Editor') {
        const event = args.element.querySelector('#EditForm');
        if (event && event.getAttribute('data-id')) {
          const eventId = event.getAttribute('data-id');

          if (this.selectedBartendersCalled === eventId) return;

          this.selectedEventBartenders = [];
          this.selectedBartendersCalled = '';

          this.eventsService.getEvent(eventId as string).subscribe((event) => {
            this.selectedBartendersCalled = event.id;

            if (this.selectedEventBartenders.length === 0) {
              this.selectedEventBartenders = [{ text: 'Aucun barman inscrit' }];
            }
          });
        }
      }
    }
  }

  onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreate') {
      args.cancel = true;
      args.data?.forEach((event: SchedulerEvent) => {
        this.eventsService.addEvent(event).subscribe((event) => {
          this.eventSettings.next({
            ...this.eventSettings,
            dataSource: [...(this.scheduleObj?.eventsData ?? []), this.eventMapper.mapToScheduler(event)],
          });
        });
      });
    }
    if (args.requestType === 'eventChange') {
      args.cancel = true;
      this.eventsService.updateEvent(args.data as SchedulerEvent).subscribe((event) => {
        this.eventsService.getEvents().subscribe((events) => {
          this.eventSettings.next({
            ...this.eventSettings,
            dataSource: [...events.map((event) => this.eventMapper.mapToScheduler(event))],
          });
        });
      });
    }
    if (args.requestType === 'eventRemove') {
      args.cancel = true;
      this.eventsService.deleteEvent(args.data as SchedulerEvent).subscribe((event) => {
        this.eventsService.getEvents().subscribe((events) => {
          this.eventSettings.next({
            ...this.eventSettings,
            dataSource: [...events.map((event) => this.eventMapper.mapToScheduler(event))],
          });
        });
      });
    }
  }
}
