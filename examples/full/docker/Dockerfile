FROM ubuntu:20.04

# Set timezone to UTC to avoid tzdata interactive mode
ENV TZ=Etc/UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Update packages and install Apache + PHP 7.4
RUN apt-get update && apt-get install -y \
    apache2 \
    php7.4 \
    libapache2-mod-php7.4 \
    php7.4-cli \
    php7.4-mbstring \
    php7.4-xml \
    php7.4-curl \
    php7.4-mysql \
    php7.4-zip \
    && apt-get clean

# Set working directory
WORKDIR /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache in foreground
CMD ["apache2ctl", "-D", "FOREGROUND"]
