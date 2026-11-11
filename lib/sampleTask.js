// Recorded V20 calls for one completed evaluation task, extracted from the captured test records
// (current-study-captured/task-receipts, outputs and call-status). Values are as recorded.
export const SAMPLE_TASK = {
  "task": "django__django-11883",
  "selectedV20": "django.core.cache.backends.filebased.FileBasedCache._delete",
  "selectedT20": "django.core.cache.backends.filebased.FileBasedCache.delete",
  "t20Votes": {
    "django.core.cache.backends.filebased.FileBasedCache.delete": 4
  },
  "rows": [
    {
      "rank": 1,
      "symbol": "django.core.cache.backends.filebased.FileBasedCache._is_expired",
      "score": 2,
      "promptTokens": 397,
      "sourceTokens": 157,
      "seconds": 1.96,
      "rssMiB": 1358.0,
      "outputSha": "3967978016c3"
    },
    {
      "rank": 2,
      "symbol": "django.core.cache.backends.filebased.FileBasedCache._delete",
      "score": 3,
      "promptTokens": 315,
      "sourceTokens": 79,
      "seconds": 1.6,
      "rssMiB": 1359.2,
      "outputSha": "d21ce96cf93c"
    },
    {
      "rank": 3,
      "symbol": "django.db.models.deletion.Collector.can_fast_delete",
      "score": 0,
      "promptTokens": 406,
      "sourceTokens": 162,
      "seconds": 1.9,
      "rssMiB": 1368.0,
      "outputSha": "38e9e0dcf4ac"
    },
    {
      "rank": 4,
      "symbol": "django.forms.formsets.BaseFormSet._should_delete_form",
      "score": 1,
      "promptTokens": 282,
      "sourceTokens": 42,
      "seconds": 1.63,
      "rssMiB": 1354.3,
      "outputSha": "0f1444ef8bf0"
    },
    {
      "rank": 5,
      "symbol": "django.db.backends.oracle.schema.DatabaseSchemaEditor._unique_should_be_added",
      "score": 0,
      "promptTokens": 318,
      "sourceTokens": 65,
      "seconds": 1.53,
      "rssMiB": 1353.2,
      "outputSha": "1ce0f6cfa9ad"
    },
    {
      "rank": 6,
      "symbol": "django.core.cache.backends.filebased.FileBasedCache._cull",
      "score": 2,
      "promptTokens": 438,
      "sourceTokens": 202,
      "seconds": 1.9,
      "rssMiB": 1369.7,
      "outputSha": "dc981f8395a5"
    },
    {
      "rank": 7,
      "symbol": "django.db.backends.base.schema.BaseDatabaseSchemaEditor._field_should_be_indexed",
      "score": 0,
      "promptTokens": 267,
      "sourceTokens": 17,
      "seconds": 1.56,
      "rssMiB": 1358.2,
      "outputSha": "8a29d825e357"
    },
    {
      "rank": 8,
      "symbol": "django.core.cache.backends.filebased.FileBasedCache",
      "score": 2,
      "promptTokens": 396,
      "sourceTokens": 163,
      "seconds": 2.02,
      "rssMiB": 1361.6,
      "outputSha": "52d0aa44a901"
    },
    {
      "rank": 9,
      "symbol": "django.db.backends.oracle.schema.DatabaseSchemaEditor._field_should_be_indexed",
      "score": 0,
      "promptTokens": 342,
      "sourceTokens": 93,
      "seconds": 1.75,
      "rssMiB": 1360.8,
      "outputSha": "ba42f535bc8d"
    },
    {
      "rank": 10,
      "symbol": "django.contrib.staticfiles.management.commands.collectstatic.Command.delete_file",
      "score": 0,
      "promptTokens": 459,
      "sourceTokens": 212,
      "seconds": 2.15,
      "rssMiB": 1376.4,
      "outputSha": "a7bac33f3aac"
    },
    {
      "rank": 11,
      "symbol": "django.db.backends.base.schema.BaseDatabaseSchemaEditor._unique_should_be_added",
      "score": 0,
      "promptTokens": 314,
      "sourceTokens": 60,
      "seconds": 1.65,
      "rssMiB": 1356.4,
      "outputSha": "8d59748b6682"
    },
    {
      "rank": 12,
      "symbol": "django.db.backends.mysql.schema.DatabaseSchemaEditor._field_should_be_indexed",
      "score": 0,
      "promptTokens": 423,
      "sourceTokens": 174,
      "seconds": 1.9,
      "rssMiB": 1377.1,
      "outputSha": "0e5dafb533f9"
    },
    {
      "rank": 13,
      "symbol": "django.core.cache.backends.base.BaseCache.get_or_set",
      "score": 2,
      "promptTokens": 412,
      "sourceTokens": 159,
      "seconds": 2.02,
      "rssMiB": 1362.9,
      "outputSha": "7dd04461ae1a"
    },
    {
      "rank": 14,
      "symbol": "django.core.cache.backends.filebased.FileBasedCache.delete",
      "score": 2,
      "promptTokens": 259,
      "sourceTokens": 20,
      "seconds": 1.66,
      "rssMiB": 1351.9,
      "outputSha": "51a85007f5de"
    },
    {
      "rank": 15,
      "symbol": "django.db.migrations.autodetector.MigrationAutodetector.generate_deleted_models",
      "score": 0,
      "promptTokens": 478,
      "sourceTokens": 237,
      "seconds": 1.96,
      "rssMiB": 1358.4,
      "outputSha": "03fcc6cbe576"
    },
    {
      "rank": 16,
      "symbol": "django.contrib.gis.db.backends.postgis.schema.PostGISSchemaEditor._field_should_be_indexed",
      "score": 0,
      "promptTokens": 299,
      "sourceTokens": 44,
      "seconds": 1.62,
      "rssMiB": 1363.0,
      "outputSha": "2b413c6b11fe"
    },
    {
      "rank": 17,
      "symbol": "django.core.cache.backends.db.DatabaseCache._base_delete_many",
      "score": 3,
      "promptTokens": 391,
      "sourceTokens": 149,
      "seconds": 1.87,
      "rssMiB": 1360.0,
      "outputSha": "117b17d7f38f"
    },
    {
      "rank": 18,
      "symbol": "django.core.cache.backends.filebased.FileBasedCache._list_cache_files",
      "score": 2,
      "promptTokens": 358,
      "sourceTokens": 116,
      "seconds": 1.59,
      "rssMiB": 1363.1,
      "outputSha": "94008bdef3ae"
    },
    {
      "rank": 19,
      "symbol": "django.db.models.fields.related.ForeignKey._check_on_delete",
      "score": 0,
      "promptTokens": 384,
      "sourceTokens": 145,
      "seconds": 1.93,
      "rssMiB": 1354.8,
      "outputSha": "45586a78554c"
    },
    {
      "rank": 20,
      "symbol": "django.utils.translation.__init__.lazy_number.NumberAwareString._get_number_value",
      "score": 0,
      "promptTokens": 338,
      "sourceTokens": 93,
      "seconds": 1.59,
      "rssMiB": 1360.3,
      "outputSha": "d066e9412d0a"
    }
  ]
};
