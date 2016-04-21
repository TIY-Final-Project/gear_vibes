from gear_vibes.settings import *

# Static Files Config
STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media'

STATICFILES_STORAGE = 'gear_vibes.custom_storages.StaticStorage'
DEFAULT_FILE_STORAGE = 'gear_vibes.custom_storages.MediaStorage'
