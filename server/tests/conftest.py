import pytest
import config.environment

config.environment.db_URI = 'postgresql://localhost:5432/test_barter_db'

from tests.lib import setup_db
setup_db()
