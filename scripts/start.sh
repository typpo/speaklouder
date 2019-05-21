#!/bin/bash -e

NODE_ENV=production pm2 start --name 'speaklouder' call_campaign_entry.js

