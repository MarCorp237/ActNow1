# Utiliser l'image officielle PHP avec Apache
FROM php:8.2-apache

# Installer les dépendances systèmes nécessaires pour Laravel, React et PostgreSQL
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    nodejs \
    npm

# Vider le cache apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Installer les extensions PHP requises (dont PostgreSQL pour la BDD Render)
RUN docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# Activer la réécriture d'URL d'Apache (mod_rewrite)
RUN a2enmod rewrite

# Dire à Apache que le dossier public de Laravel est la racine du site
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le dossier de travail
WORKDIR /var/www/html

# Copier tous les fichiers du projet
COPY . .

# Installer les dépendances PHP
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Installer les dépendances Javascript et compiler React
RUN npm install
RUN npm run build

# Donner les bonnes permissions aux dossiers Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
