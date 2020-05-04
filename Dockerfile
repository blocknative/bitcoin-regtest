FROM ubuntu:18.04

# Install dependencies
RUN apt-get update && apt-get install -y gnupg2 && apt-get install -y build-essential && apt-get install software-properties-common -y && apt-get install curl -y

# Install Bitcoin
RUN curl https://bitcoin.org/bin/bitcoin-core-0.19.1/bitcoin-0.19.1-x86_64-linux-gnu.tar.gz --output bitcoin-0.19.1-x86_64-linux-gnu.tar.gz
RUN tar -xf bitcoin-0.19.1-x86_64-linux-gnu.tar.gz
ENV PATH="/bitcoin-0.19.1/bin:${PATH}"

# Configure Bitcoin
ENV HOME /bitcoin
WORKDIR /bitcoin
RUN mkdir user0 user1 user2 user3 user4 user5 user6 user7 user8 user9
VOLUME ["/bitcoin"]
COPY run_servers /usr/local/bin/run_servers
COPY bitcoin /bitcoin/.bitcoin
COPY users.json /bitcoin/users.json
EXPOSE 18444 2000 2001 2002 2003 2004 2005 2006 2007 2008 2009

# Start nodes
CMD ["run_servers"]
