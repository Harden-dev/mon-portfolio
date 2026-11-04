# Déploiement sur un VPS

Le site est une application Next.js. Sur le serveur, elle tourne avec Node.js, reste allumée grâce à PM2 et passe derrière Nginx, qui gère le domaine et le HTTPS (certificat Let's Encrypt).

```
Visiteur ──HTTPS──▶ Nginx (80/443) ──▶ Next.js sur 127.0.0.1:3001 (PM2)
```

Les commandes ci-dessous supposent Ubuntu ou Debian, un utilisateur avec `sudo` et un nom de domaine dont l'enregistrement **A** pointe vers l'IP du VPS.

## 1. Préparer le serveur (une seule fois)

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git nginx certbot python3-certbot-nginx
```

Node.js 22 et pnpm :

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo corepack enable
corepack prepare pnpm@10.28.0 --activate
```

PM2, pour garder le site allumé et le relancer après un redémarrage :

```bash
sudo npm install -g pm2
```

Pare-feu : on ouvre seulement SSH, HTTP et HTTPS. Le port de l’application (3001) reste fermé, seul Nginx y accède.

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 2. Récupérer le code

```bash
sudo mkdir -p /var/www && sudo chown $USER:$USER /var/www
cd /var/www
git clone https://github.com/Harden-dev/mon-portfolio.git portfolio
cd portfolio
```

Si le dépôt est privé, ajoute d'abord une clé SSH de déploiement sur GitHub (Settings → Deploy keys) et clone avec `git@github.com:Harden-dev/mon-portfolio.git`.

## 3. Premier build et démarrage

```bash
pnpm install --frozen-lockfile
pnpm build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

`pm2 startup` affiche une commande `sudo …` : copie-la et lance-la. Elle relance le site automatiquement au redémarrage du VPS.

Vérifie que le site répond en local :

```bash
curl -I http://127.0.0.1:3001
```

## 4. Nginx et HTTPS

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/portfolio
sudo nano /etc/nginx/sites-available/portfolio
```

Remplace `example.com` par ton domaine, puis :

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d tondomaine.com -d www.tondomaine.com
```

Certbot installe le certificat, ajoute la redirection HTTP vers HTTPS et programme le renouvellement automatique. Pour le tester : `sudo certbot renew --dry-run`.

## 5. Mettre le site à jour

Après chaque modification poussée sur GitHub :

```bash
cd /var/www/portfolio
./scripts/deploy.sh main
```

Le script récupère la branche, installe les dépendances, refait le build et recharge PM2. Il remet le dossier exactement à l'état de GitHub (`git reset --hard`) : ne modifie jamais de fichiers directement sur le serveur.

## Changer de port

Le site écoute sur **3001**, car le port 3000 est souvent déjà pris par un autre projet. Pour vérifier quels ports sont occupés :

```bash
sudo ss -ltnp | grep -E ':30[0-9]{2}'
```

Pour utiliser un autre port, par exemple 3005 :

```bash
pm2 delete portfolio
PORT=3005 pm2 start ecosystem.config.cjs
pm2 save
```

Puis remplace `3001` par `3005` dans les deux `proxy_pass` de `/etc/nginx/sites-available/portfolio` et recharge Nginx (`sudo nginx -t && sudo systemctl reload nginx`).

## Commandes utiles

| Besoin | Commande |
| --- | --- |
| État du site | `pm2 status` |
| Logs en direct | `pm2 logs portfolio` |
| Redémarrer | `pm2 restart portfolio` |
| Logs Nginx | `sudo tail -f /var/log/nginx/error.log` |
| Tester la config Nginx | `sudo nginx -t` |

## En cas de problème

- **502 Bad Gateway** ou `curl: (7) Failed to connect` : l'application ne tourne pas. Regarde `pm2 status` et `pm2 logs portfolio`. Si les logs affichent `EADDRINUSE`, le port est déjà pris par un autre projet : voir « Changer de port ».
- **Le build s'arrête sans message (« Killed »)** : le VPS manque de mémoire. Ajoute 2 Go de swap :
  ```bash
  sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
  sudo mkswap /swapfile && sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  ```
- **Certbot échoue** : vérifie que le domaine pointe bien vers l'IP du VPS (`dig +short tondomaine.com`) et que le port 80 est ouvert.
