FROM mcr.microsoft.com/azure-functions/base:3.0

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY . /home/site/wwwroot

RUN apt-get update && \
    apt-get install -y --no-install-recommends php7.4-cli php7.4-mysql && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
