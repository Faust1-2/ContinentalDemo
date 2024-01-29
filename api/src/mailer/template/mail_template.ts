export default (token = '') => `
<html>

<head>
<title>Bienvenue au Continental !</title>
</head>

<body>
<h1>Création du compte</h1>
<p>Bravo, tu es officiellement un membre de l'équipe du continental:</p><a href=${token} target="_blank">Créé ton compte</a>
<p>Ce lien va expirer dans 48 heures.</p>
<p>Cordialement,</p>
<p>Le Saint Continental</p>
</body>

</html>
`;
