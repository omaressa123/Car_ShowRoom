@echo off
REM Set Java Home
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

REM Change to project directory
cd /d D:\mycar_showroom

REM Download Maven if needed
if not exist ".mvn\wrapper\maven-wrapper.jar" (
    echo Downloading Maven wrapper...
    powershell -Command "& {$scriptDir='%~dp0\\.mvn\\wrapper'; $ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.4/maven-wrapper-3.3.4.jar' -OutFile '$scriptDir\\maven-wrapper.jar'}"
    if errorlevel 1 (
        echo Failed to download Maven wrapper
        exit /b 1
    )
)

REM Run Maven
call mvnw.cmd clean install
