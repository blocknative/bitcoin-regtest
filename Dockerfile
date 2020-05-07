FROM ubuntu:18.04

COPY btc-binaries.tar.gz btc-binaries.tar.gz
RUN tar -xf btc-binaries.tar.gz
ENV PATH="/btc-binaries:${PATH}"

# Configure Bitcoin
ENV HOME /bitcoin
WORKDIR /bitcoin
RUN mkdir user0 user1 user2 user3 user4 user5 user6 user7 user8 user9
VOLUME ["/bitcoin"]
COPY run_servers /usr/local/bin/run_servers
COPY bitcoin /bitcoin/.bitcoin
COPY users.json /bitcoin/users.json

EXPOSE 18444 1999 2000 2001 2002 2003 2004 2005 2006 2007 2008 2009 2010 29000

# Start nodes
CMD ["run_servers"]
