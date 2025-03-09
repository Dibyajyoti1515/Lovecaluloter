import  { useState } from "react";
import "./lovelcal.css";

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyBWNcHYHHGsgTWqqcnT5rkVlaL_PTYF25Q"); // Replace this

const LoveCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [lovePercentage, setLovePercentage] = useState(null);
  const [loveMessage, setLoveMessage] = useState("");

  const frindname = ["mutthal", "bibhu", "ashwin", "siddhanta", "siddhant", "siddharth","akash","saikrishna","sai krishna","sai"];
  const calculateLove = async () => {
    if (name1.trim() === "" || name2.trim() === "") {
      alert("Please enter both names!");
      return;
    }
    const randomLove = Math.floor(Math.random() * 31) + 70;
    if(name1.toLowerCase() === name2.toLowerCase()) {
      setLovePercentage(-100);
      return;
    }

    if(name1.toLowerCase().trim() === "randi" || name2.toLowerCase().trim() === "randi"){
        setLovePercentage(100);
        setLoveMessage("Generating a romantic message...");
        setLoveMessage("Bhai kya kar rahe ho? 🤣");
        return;
    }
     

    if(frindname.includes(name1.toLowerCase().trim()) || frindname.includes(name2.toLowerCase().trim())) {
        setLovePercentage((Math.floor(Math.random() * 5))+ 96);
        setTimeout(() => {
          setLoveMessage("Apna sakal dekho pehle! 😂");
        }, 2000);
          
        setLoveMessage("Generating a romantic message...");
        return;
    }

    setLovePercentage(randomLove);
      try {
        setLoveMessage("Generating a romantic message...");
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBWNcHYHHGsgTWqqcnT5rkVlaL_PTYF25Q`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Generate a romantic message for a couple named ${name1} and ${name2} with a love percentage of ${lovePercentage}%.Remember that only 2 lines with 20 words allowed.
                              Make it romantic and sweet! with some emojies.Not add ${name1} and ${name2}, ${lovePercentage}% love . write a romantic message for them.dont write name and percentage in first line
                              write in 2 lines with 30 words.`,
                    },
                  ],
                },
              ],
            }),
          }
        );
  
      const data = await response.json();

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      setLoveMessage(data.candidates[0].content.parts[0].text);
    } else {
      setLoveMessage("Love is a mystery beyond words! 💞");
    }
  } catch (error) {
    console.error("Error fetching AI message:", error);
    setLoveMessage("Love is a mystery beyond words! 💞");
  }
 
 }

  
  
  


  return (
    <div className="flex items-center justify-center h-screen bg-pink-100">
      <div>
        <div className="CardContent">
            <div><h2 className="text-2xl font-bold text-pink-600">Love Calculator ❤️</h2></div>
            <div>
                <input
                    className="input1name"
                    placeholder="Your Name"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                />
            </div>
          
            <div>
                <input
                    className="input1name"
                    placeholder="Your Crush Name"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                />
            </div>
            <div>
                <button
                    className="button1"
                    onClick={() => calculateLove()}
                    type="button"
                >
                    Calculate
                </button>
            </div>    
            <div>
                <div>
                    {lovePercentage !== null && (
                        <h3 className="text-xl font-bold text-red-500">
                            Love Percentage: {lovePercentage}%
                        </h3>
                    )}
                </div>
            </div>
            <div>
                <h4>{loveMessage}</h4>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoveCalculator;
