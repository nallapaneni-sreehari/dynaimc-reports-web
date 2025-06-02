#!/bin/bash

# Start Collabora in background
coolwsd --o:ssl.enable=false &

# Start Apache (Nextcloud)
apache2-foreground
