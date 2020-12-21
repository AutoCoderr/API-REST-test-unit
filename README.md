# API-REST-test-unit
Une API Rest avec des tests unitaire dans le cadre d'un devoir en master

# Lancement du projet

Pour lancer le projet, vous devez d'abord aller dans le dossier api et faire un npm install.
Ensuite, retournez au niveau du docker-compose et lancez le docker-compose avec docker-compose up -d

Enfin pour lancer les tests, entrez la commande docker-compose exec api npm test.

Attention : L'envoi de mail peut ne pas se faire si le Docker tourne sous un environnement Windows. (Bug lié à Windows)
