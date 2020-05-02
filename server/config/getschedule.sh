#!/bin/bash

#the only output is the file name All other "logs" should be to std err
#echo "using apiKey -> $ENV_GOOGLE_APIKEY" 1>&2

minDate=$( date +%Y-%m-%dT%TZ )

#minDate=2020-05-01T20:40:14Z

maxDate=$(date -d "$minDate +5 min" +%Y-%m-%dT%TZ)

echo "minDate : $minDate, maxDate: $maxDate" 1>&2
url="https://www.googleapis.com/calendar/v3/calendars/labizbille.com_disahq3i74fnstuv219l4pdc60@group.calendar.google.com/events?key=$ENV_GOOGLE_APIKEY"
datePart="&timeMin=$minDate&timeMax=$maxDate"
finalurl="$url$datePart"

event=$(curl -s $finalurl | jq '.items[0]' )
echo "Event found -> $event" 1>&2

#the xargs is needed to remove quotes
FILE=$( echo $event | jq '.location'| xargs)

if [[ -f $FILE ]]; then
# output the location
    echo $FILE
else
    echo "$FILE does not exist" 1>&2
fi

