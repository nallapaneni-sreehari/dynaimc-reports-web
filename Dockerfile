FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN ln -fs /usr/share/zoneinfo/Etc/UTC /etc/localtime && \
    apt-get update && \
    apt-get install -y --no-install-recommends apache2 php php-cli php-curl php-zip php-gd php-mbstring php-xml php-mysql wget unzip supervisor curl gnupg apt-transport-https ca-certificates lsb-release && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
# Install Apache, PHP, wget, unzip, supervisor
RUN apt-get update && apt-get install -y apache2 php php-cli php-curl php-zip php-gd php-mbstring php-xml php-mysql wget unzip supervisor curl gnupg apt-transport-https ca-certificates lsb-release

# Add Collabora repo & key (replace CUSTOMER_HASH)
RUN wget -O /usr/share/keyrings/collaboraonline-release-keyring.gpg https://collaboraoffice.com/downloads/gpg/collaboraonline-release-keyring.gpg
RUN echo "Types: deb\nURIs: https://www.collaboraoffice.com/repos/CollaboraOnline/24.04/customer-deb-CUSTOMER_HASH\nSuites: ./\nSigned-By: /usr/share/keyrings/collaboraonline-release-keyring.gpg" > /etc/apt/sources.list.d/collaboraonline.sources

RUN apt-get update && apt-get install -y coolwsd collabora-online-brand

# Download and extract Nextcloud
RUN curl -o /tmp/nextcloud.zip https://download.nextcloud.com/server/releases/latest.zip \
    && unzip /tmp/nextcloud.zip -d /var/www/html/ \
    && rm /tmp/nextcloud.zip

# Copy your custom files here (make sure you put them alongside Dockerfile)
COPY ContentSecurityPolicy.php /var/www/html/nextcloud/lib/public/AppFramework/Http/ContentSecurityPolicy.php
COPY OC_Response.php /var/www/html/nextcloud/lib/private/legacy/OC_Response.php
COPY ApiController.php /var/www/html/nextcloud/lib/public/AppFramework/ApiController.php
COPY CORSMiddleware.php /var/www/html/nextcloud/lib/private/AppFramework/Middleware/Security/CORSMiddleware.php
COPY proxy.php /var/www/html/nextcloud/custom_apps/richdocumentscode/proxy.php

# Fix permissions
RUN chown -R www-data:www-data /var/www/html/nextcloud

# Copy simple supervisord config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80 9980

CMD ["/usr/bin/supervisord", "-n"]
