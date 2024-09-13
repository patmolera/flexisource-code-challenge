import React, { useState } from 'react';
import './App.css';

type Activity = {
  index: number;
  start: number;
  end: number;
};

const assignActivities = (activities: Activity[]): string => {
  let cEnd = 0; // End time for Charles
  let jEnd = 0; // End time for Loraine
  const result = new Array(activities.length).fill('');

  // Sort activities by start time
  activities.sort((a, b) => a.start - b.start);

  for (const { start, end, index } of activities) {
    if (start >= cEnd) {
      result[index] = 'C';
      cEnd = end;
      continue;
    }

    if (start >= jEnd) {
      result[index] = 'J';
      jEnd = end;
      continue;
    }

    return 'IMPOSSIBLE';
  }

  return result.join('');
};

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    const lines = input.trim().split('\n');
    const T = parseInt(lines[0]);
    const result: string[] = [];
    let lineIndex = 1;

    for (let t = 1; t <= T; t++) {
      const N = parseInt(lines[lineIndex]);
      const activities: Activity[] = [];

      // Parse each activity
      for (let i = 0; i < N; i++) {
        const [start, end] = lines[lineIndex + 1 + i].split(' ').map(Number);
        activities.push({ index: i, start, end });
      }

      lineIndex += N + 1;

      // Find the schedule for this test case
      const schedule = assignActivities(activities);
      result.push(`Case #${t}: ${schedule}`);
    }

    setOutput(result);
  };

  return (
    <div>
      <h1>Schedule Activities</h1>
      <textarea
        rows={10}
        cols={50}
        value={input}
        onChange={handleInputChange}
        placeholder="Enter input"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h2>Output</h2>
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
