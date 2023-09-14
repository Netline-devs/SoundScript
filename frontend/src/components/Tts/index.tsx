/** @format */
import style from "./style.module.css";
import { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { SpeechSynthesisRecorder } from "../../utils/recorder";
import { Helmet } from "react-helmet-async";
export default function Tts() {
  const synth = window.speechSynthesis;

  const [text, setText] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [volume, setVolume] = useState<number>(1);
  const [pitch, setPitch] = useState(1);
  const [recorder, setRecorder] = useState<SpeechSynthesisRecorder | null>(
    null
  );

  const [isDownloadAble, setDownloadAble] = useState<boolean>(false);

  useEffect(() => {
    setVoices(synth.getVoices());
    console.log(
      "%cDon't paste anything here hackers can use this to access your info",
      "color: red; font-weight: bold; font-size: 25px;"
    );

    console.log(
      "%c Here is our discord server: https://discord.gg/sKmfq7DU58",
      "color: #1486e2; font-weight: bold; font-size: 25px;"
    );

    console.log(
      "%c Here is my instagram: https://www.instagram.com/itszavier_1/",
      "color: #1486e2; font-weight: bold; font-size: 25px;"
    );

    return () => {
      if (recorder) {
        console.clear();
        recorder.stopRecording();
        setRecorder(null);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (synth.speaking || text.length <= 0) {
      return;
    }

    if (text.length === 0) {
      return;
    }
    const utterThis = new SpeechSynthesisUtterance(text);

    const voice = voices.find((voice) => {
      if (selectedVoice === "default") {
        return voice.default;
      } else {
        return voice.name === selectedVoice;
      }
    }) as SpeechSynthesisVoice;

    const recorder = new SpeechSynthesisRecorder(utterThis);

    utterThis.onstart = () => {
      if (recorder) {
        recorder.startRecording();
      }

      setDownloadAble(false);
    };

    utterThis.onend = () => {
      if (recorder) {
        recorder.stopRecording();

        setDownloadAble(true);
      }
    };

    utterThis.onerror = (error) => {
      console.error("onerror event", error);
    };

    utterThis.pitch = pitch;
    utterThis.voice = voice;
    utterThis.volume = volume;
    synth.speak(utterThis);

    setRecorder(recorder);
  };

  const selectOptions = voices.map((voice) => {
    if (voice.default) {
      return {
        value: "default",
        label: `${voice.name} - ${voice.lang} - default`,
      };
    } else {
      return { value: voice.name, label: `${voice.name} - ${voice.lang}` };
    }
  });

  return (
    <div className={style.tts}>
      <Helmet>
        <title>SS | Text To Speech</title>
        <meta
          name="description"
          content="A Free Text to speech application that allows you to convert text to speech free download"
        />

        <meta
          name="keywords"
          content="TTS, Text to Speech, free download,tts,Natural Language Processing, Speech Synthesis,Voiceover,Accessibility,Multilingual,Customizable Speech Rate/Pitch"
        />

        <meta name="author" content="Netline by imani brown" />
      </Helmet>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.wrapper}>
          <div className={style.main_input_wrapper}>
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              className={`${style.input} ${style.textarea}`}
              placeholder="Type something to transform here"
            ></textarea>
          </div>

          <div className={style.input_group}>
            <div className={style.button_wrapper}>
              <button
                className={`${style.button}`}
                type="button"
                disabled={!isDownloadAble}
                onClick={() => {
                  if (recorder) {
                    recorder.downloadAudio();
                  }
                }}
              >
                Download
              </button>
              <button
                className={`${style.button} ${style.play_btn}`}
                type="submit"
              >
                Play
              </button>
            </div>
            <div className={style.input_wrapper}>
              <label htmlFor="">Langauge:</label>
              <div className={style.input_container}>
                <ReactSelect
                  options={selectOptions}
                  styles={{
                    container(base) {
                      return {
                        ...base,
                        width: "100%",
                      };
                    },

                    control(base) {
                      return {
                        ...base,
                        backgroundColor: "#b9b4b4",
                        color: "black",
                      };
                    },

                    option(base) {
                      return {
                        ...base,
                        color: "black",
                      };
                    },
                  }}
                  defaultValue={selectOptions.filter(
                    (voice) => voice.value.toLowerCase() === "default"
                  )}
                  onChange={(e) => setSelectedVoice(e?.value as string)}
                />
              </div>
            </div>
            <div className={style.input_wrapper}>
              <label htmlFor="volumeRange">Volume:</label>
              <div className={style.input_container}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  id="volumeRange"
                  className={`${style.input} ${style.range_input}`}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  value={volume}
                />
                <small>{(volume * 100).toFixed(0)}%</small>
              </div>
            </div>

            <div className={style.input_wrapper}>
              <label htmlFor="pitch">Pitch:</label>
              <div className={style.input_container}>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  id="pitch"
                  className={`${style.input} ${style.range_input}`}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  value={pitch}
                />
                <small>{(pitch * 50).toFixed(0)}%</small>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
