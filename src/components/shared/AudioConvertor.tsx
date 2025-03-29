import { FFmpeg } from "@ffmpeg/ffmpeg";
import React, { useState, useEffect } from "react";

interface FFmpegData {
  instance: any;
  fetchFile: any;
}

const AudioConverter: React.FC = () => {
  const [mp3File, setMp3File] = useState<File | null>(null);
  const [wavUrl, setWavUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ffmpegData, setFfmpegData] = useState<FFmpegData | null>(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        // Dynamically import the module and cast its shape for TypeScript.
        const ffmpegModule = (await import("@ffmpeg/ffmpeg")) as {
          createFFmpeg: any;
          fetchFile: any;
        };
        const ffmpegInstance = ffmpegModule.createFFmpeg({ log: true });
        await ffmpegInstance.load();
        setFfmpegData({
          instance: ffmpegInstance,
          fetchFile: ffmpegModule.fetchFile,
        });
      } catch (err) {
        console.error("Error loading FFmpeg:", err);
      }
    };

    loadFFmpeg();
  }, []);

  const handleConvert = async () => {
    if (!mp3File) {
      alert("Please select an MP3 file first!");
      return;
    }
    if (!ffmpegData) {
      alert("FFmpeg is still loading. Please wait...");
      return;
    }

    setLoading(true);

    const inputFileName = "input.mp3";
    const outputFileName = "output.wav";

    try {
      // Write the file to FFmpeg's in-memory filesystem
      ffmpegData.instance.FS(
        "writeFile",
        inputFileName,
        await ffmpegData.fetchFile(mp3File)
      );
      // Run conversion command
      await ffmpegData.instance.run("-i", inputFileName, outputFileName);
      // Read the result
      const data = ffmpegData.instance.FS("readFile", outputFileName);
      const wavBlob = new Blob([data.buffer], { type: "audio/wav" });
      setWavUrl(URL.createObjectURL(wavBlob));
    } catch (err) {
      console.error("Error during conversion:", err);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>MP3 to WAV Converter</h2>
      <input
        type="file"
        accept="audio/mp3"
        onChange={(e) => setMp3File(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={handleConvert} disabled={loading || !ffmpegData}>
        {loading ? "Converting..." : "Convert to WAV"}
      </button>

      {wavUrl && (
        <div>
          <h3>Download WAV File:</h3>
          <a href={wavUrl} download="converted.wav">
            Download WAV
          </a>
        </div>
      )}
    </div>
  );
};

export default AudioConverter;
