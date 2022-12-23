FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV TZ /Asia/Kolkata
RUN mkdir -p /code
RUN mkdir -p /var/log/credgenics_logs/

#Create shh config
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \
    ssh-keyscan github.com > /root/.ssh/known_hosts

ADD ssh_prv_key /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

# Create app directory
WORKDIR /code
COPY requirements.txt ./

RUN pip install -r requirements.txt
# Bundle app source
COPY ./ /code
RUN chmod 755 -R /code
RUN chmod 777 -R /code/
RUN chmod 777 -R /var/log/credgenics_logs/

EXPOSE 8000

CMD uvicorn server:app --host 0.0.0.0 --port 8000 --no-access-log