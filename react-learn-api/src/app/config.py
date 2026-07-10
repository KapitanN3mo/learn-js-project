from datetime import timedelta

SECRET_KEY = "CHANGE_THIS_SECRET"  # override in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

UPLOAD_DIR = "uploads"
