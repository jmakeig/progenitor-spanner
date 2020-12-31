#! /usr/bin/env bash

# Dependencies:
#  - Python (>=2.7, >=3)
#  - Docker
#  - gcloud SDK (https://cloud.google.com/sdk)


PROJECT="jmakeig-progenitor"
INSTANCE="sandbox"
DATABASE="progenitor"

echo "Project: $PROJECT" 
echo "Instance: $INSTANCE"
echo "Database: $DATABASE"

# echo "Updating components…"
# gcloud components update
echo "Starting emulator in the background…"
gcloud beta emulators spanner start &
echo "$!"

# https://medium.com/google-cloud/cloud-spanner-emulator-bf12d141c12
echo "Configuring emulator environment…"
gcloud config configurations create emulator 2> /dev/null
gcloud config set auth/disable_credentials true
gcloud config set project $PROJECT
gcloud config set api_endpoint_overrides/spanner http://localhost:9020/

echo "Creating instance $INSTANCE"
gcloud spanner instances create $INSTANCE --config=emulator-config --description="" --nodes=1
echo "Creating database $DATABASE"
gcloud spanner databases create $DATABASE --instance $INSTANCE --ddl-file "ddl.sql"

# export SPANNER_EMULATOR_HOST=localhost:9010
$(gcloud beta emulators spanner env-init)

# To switch back to the default config:
# gcloud config configurations activate default
# To switch back to the emulator config:
# gcloud config configurations activate emulator