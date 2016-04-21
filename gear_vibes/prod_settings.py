from gear_vibes.settings import *

# Static Files Config
STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media'

STATICFILES_STORAGE = 'gear_vibes.custom_storages.StaticStorage'
STATIC_URL = 'https://{}/{}/'.format(AWS_S3_CUSTOM_DOMAIN, STATICFILES_LOCATION)
MEDIA_URL = "https://{}/{}/".format(AWS_S3_CUSTOM_DOMAIN, MEDIAFILES_LOCATION)


DEFAULT_FILE_STORAGE = 'gear_vibes.custom_storages.MediaStorage'
