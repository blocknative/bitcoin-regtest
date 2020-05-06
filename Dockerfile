FROM ubuntu:18.04

# Install Bitcoin
COPY bitcoin-0.19.1-x86_64-linux-gnu.tar.gz bitcoin-0.19.1-x86_64-linux-gnu.tar.gz
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

# Start nodes
CMD ["run_servers"]
