#!/bin/bash

pushd `dirname $0`
cd "$(git rev-parse --show-toplevel)"
mkdir -p /var/log/callcampaigns

echo "starting @ `date`"

# node
NODE_ENV=production
supervisor call_campaign_entry.js 2>> /var/log/callcampaigns/node.err.log 1>> /var/log/callcampaigns/node.out.log &

for job in `jobs -p`
do
echo $job
  wait $job
done

popd
