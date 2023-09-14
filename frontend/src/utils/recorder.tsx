/** @format */

export class SpeechSynthesisRecorder {
  utterance: SpeechSynthesisUtterance;
  mediaStream: MediaStream | null = null;
  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: Blob[] = [];

  constructor(utterance: SpeechSynthesisUtterance) {
    this.utterance = utterance;
  }

  startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaStream = stream;
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        this.mediaRecorder.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach((track) => track.stop());
      }
    }
  }

  getRecordedBlob(): Blob | null {
    if (this.recordedChunks.length === 0) {
      return null;
    }

    return new Blob(this.recordedChunks, {
      type: this.mediaRecorder?.mimeType || "audio/wav",
    });
  }

  downloadAudio() {
    const recordedBlob = this.getRecordedBlob();
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "speech_audio.wav";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }
}
