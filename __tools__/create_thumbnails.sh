#!/bin/bash
for file in *.mp4
do
  ffmpeg -ss 00:01:00 -i "$file" -vframes 1 -q:v 2 "$file.jpg"
done
