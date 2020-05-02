#!/usr/bin/env liquidsoap

# based on https://github.com/ultreme/scc-radio/tree/master/config
#%include "utils.liq"

# CONFIGS
set("log.file", true)
set("log.stdout", true)
set("log.level", 5)
set("server.telnet", true)
set("server.telnet.port", 5000)
set("server.telnet.bind_addr", "0.0.0.0")
set("log.file.path", "/tmp/broadcast.log")
set("audio.converter.samplerate.libsamplerate.quality","best")
set("buffering.path","/tmp")
set("decoding.buffer_length",10.)
set("harbor.bind_addr","0.0.0.0")
set("harbor.verbose",true)

# FUNCTIONS


scc_out = output.icecast(description="AV radio stream", genre="music", url="http://aurovilleradio.org:8000/")

output_docker_env.icecast = scc_out(
    host="icecast",
    port=8000,
    password="aaa"
)


def outputs(encoder, ~mount, input)
    output_docker_env.icecast(encoder, mount=mount, input)
end

# An emergency file
emergency = single("/config/fail.mp3")

# MIXS
jingles = playlist(mode='randomize',reload=60,reload_mode="watch","/data/streaming/random_play/jingles")

day = playlist(mode='randomize',reload=60,reload_mode="watch","/data/streaming/random_play/daylist")
morning = playlist(mode='randomize',reload=60,reload_mode="watch","/data/streaming/random_play/morning")
night = playlist(mode='randomize',reload=60,reload_mode="watch","/data/streaming/random_play/latenight")
jazz_evening = playlist(mode='randomize',reload=60,reload_mode="watch","/data/streaming/random_play/jazz_evening")
classical_morning = playlist(mode='randomize',reload=60,reload_mode="watch","/data/streaming/random_play/classical_morning")

#times in UTC
tracks = switch([ ({5h-13h}, day), ({13h-17h}, jazz_evening), ({17h-23h}, night), ({23h-3h}, morning), ({3h-6h}, classical_morning) ])
airplay = rotate(weights=[1,3],[jingles,tracks])

def googleCal_request_function() 
  result = get_process_lines("npm run prod -- ./dist/runSchedule.js")
  log("1.1 all logs: #{result}")
  nextSong = list.hd(default="",list.rev(result) );
  log("nextSong: #{nextSong}")
  request.create(nextSong)
end

cal_playlist = request.dynamic(googleCal_request_function)
output.dummy(fallible=true,cal_playlist)

airplay = fallback(track_sensitive=false,[cal_playlist,airplay])


#normalizing and processing
airplay = amplify(1.,override="replay_gain",airplay)

harbor_input = input.harbor("radiodj", port=5001, user="avradio",password="aaa")

#final play
input = fallback(track_sensitive=false,[harbor_input,airplay,emergency])



# OUTPUTS
outputs(%mp3(bitrate=128), mount="/test-av-radio-128.mp3", input)
