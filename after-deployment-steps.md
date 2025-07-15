0. Install nextcloud and enable Collabora online (CODE) default app
1. /var/www/html/nextcloud/lib/public/AppFramework/Http/ContentSecurityPolicy.php -> change /self/ to *
2. /var/www/html/nextcloud/lib/private/legacy/OC_Response.php -> comment header('X-Frame-Options: SAMEORIGIN');
3. /var/www/html/nextcloud/lib/public/AppFramework/ApiController.php set $origin = '*';
4. /var/www/html/nextcloud/lib/private/AppFramework/Middleware/Security/CORSMiddleware.php set $origin = '*';
5. /var/www/html/nextcloud/custom_apps/richdocumentscode/proxy.php set header("Access-Control-Allow-Origin: *"); on 2nd line top
6. add below in layout.user.php on top of </header> before closing tag
<script nonce="<?php p($_['cspNonce']); ?>">
			window.addEventListener('message', (event) => {
				if (event.origin !== 'http://localhost:4200') return;

				const data = event.data;
				if (data.action === 'hideUIElements') {
					if (Array.isArray(data.elements)) {
						data.elements.forEach(id => {
							const el = document.getElementById(id);
							if (el) el.style.display = 'none';
						});
					}
					if (Array.isArray(data.classNames)) {
						data.classNames.forEach(className => {
							const els = document.getElementsByClassName(className);
							for (const el of els) {
								el.style.display = 'none';
							}
						});
					}
				}
				event.source.postMessage({ status: 'elementsHidden' }, event.origin);
			});
		</script>