@echo off
xcopy /Y /F Dockerfile ..\
set /P revversion=<version.txt

if "!revversion!"=="" (
    set /P revversion=1
) else (
    set /A revversion=revversion+1
)

echo building cloudconnect.scanrev.com:5000/revsite:1.0.%revversion%
echo %revversion% > versionNo.txt
docker build -t cloudconnect.scanrev.com:5000/revsite:1.0.%revversion% ../

echo ready to publish 1.0.%revversion%, Press CTRL-C to exit or any key to continue
pause
docker push cloudconnect.scanrev.com:5000/revsite:1.0.%revversion%

echo all done
pause 