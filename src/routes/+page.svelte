<script>
	// Zusätzliche Logik kann hier eingefügt werden
</script>

<div class="jungle-container">
	<div class="leaf">
		<h1>Willkommen im Dschungel-Abenteuer!</h1>
		<p>Hilf uns, die versteckten Tiere zu entdecken und lerne spannende Fakten über sie!</p>
		<a href="/game" class="button">Spiel starten</a>
	</div>
</div>

<style>
/* Hintergrund und allgemeines Layout */
.jungle-container {
	background-image: url('https://images.unsplash.com/photo-1541417906133-3c6079c6e5d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'); /* Beispiel-Dschungelbild */
	background-size: cover;
	background-position: center;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
}

/* Blatt-Hintergrund für Texte */
.leaf {
	background-color: rgba(255, 255, 255, 0.9); /* Weißer Hintergrund mit Transparenz */
	border-radius: 15px; /* Abgerundete Ecken */
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* Leichter Schatten */
	padding: 30px;
	text-align: center;
	width: 90%;
	max-width: 600px; /* Begrenzte Breite */
}

/* Überschrift */
h1 {
	font-size: 2.8rem; /* Große Schriftgröße für Kinder */
	color: #2c3e50; /* Dunkler Text für Kontrast */
	margin-bottom: 20px;
}

/* Beschreibungstext */
p {
	font-size: 1.5rem; /* Größere Schriftgröße */
	color: #333; /* Dunkler Text */
	margin-bottom: 30px;
}

/* Start-Button */
.button {
	display: inline-block;
	padding: 15px 30px; /* Größerer Button für Kinder */
	font-size: 1.5rem; /* Größere Schriftgröße */
	font-weight: bold;
	color: white;
	background-color: #4caf50; /* Grüner Button passend zum Dschungel-Thema */
	text-decoration: none;
	border-radius: 10px; /* Abgerundete Ecken */
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Leichter Schatteneffekt */
}

.button:hover {
	background-color: #388e3c; /* Dunkleres Grün bei Hover */
}

.button:active {
	transform: scale(0.95); /* Leichter Klick-Effekt */
}

/* Responsive Design für kleinere Bildschirme */
@media (max-width: 768px) {
	h1 {
		font-size: 2rem; /* Kleinere Schriftgröße für Mobilgeräte */
	}
	p {
		font-size: 1.2rem; /* Kleinere Schriftgröße für Mobilgeräte */
	}
	.button {
		font-size: 1.2rem; /* Kleinere Schriftgröße für den Button */
		padding: 10px 20px; /* Kleinere Polsterung für den Button */
	}
}
</style>
