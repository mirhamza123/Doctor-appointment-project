// import React, { useState } from "react";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "Hello! I'm your Prescripto Assistant 🤖. How can I help you today?",
//     },
//   ]);
//   const [input, setInput] = useState("");

//   const toggleChat = () => setIsOpen(!isOpen);

//   // 💬 Basic predefined answers
//   const getBotReply = (userMessage) => {
//     const msg = userMessage.toLowerCase();

//     if (msg.includes("hello") || msg.includes("hi")) {
//       return "Hi there! 👋 How can I assist you?";
//     }
//     if (msg.includes("book") && msg.includes("appointment")) {
//       return "To book an appointment, go to the 'Doctors' page, select a doctor, and click 'Book Appointment'.";
//     }
//     if (msg.includes("doctor list") || msg.includes("available doctors")) {
//       return "You can view all available doctors in the 'Doctor List' section on the dashboard.";
//     }
//     if (msg.includes("timing") || msg.includes("open")) {
//       return "We’re open 24/7 online! But physical visits depend on each doctor’s availability.";
//     }
//     if (msg.includes("contact") || msg.includes("help")) {
//       return "You can contact our support at 📧 support@prescripto.com or use the 'Contact Us' page.";
//     }
//     if (msg.includes("bye")) {
//       return "Goodbye! Take care 😊";
//     }

//     return "I'm not sure about that yet 🤔. Please contact admin for more info.";
//   };

//   const handleSend = () => {
//     if (!input.trim()) return;
//     const newMessage = { sender: "user", text: input };
//     setMessages([...messages, newMessage]);

//     // Generate bot reply
//     setTimeout(() => {
//       const reply = getBotReply(input);
//       setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
//     }, 800);

//     setInput("");
//   };

//   return (
//     <div>
//       {/* Floating Button */}
//       <button
//         onClick={toggleChat}
//         className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
//       >
//         💬
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 flex flex-col">
//           <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
//             <h3 className="text-sm font-semibold">Prescripto Assistant</h3>
//             <button onClick={toggleChat}>✖</button>
//           </div>

//           <div className="flex-1 h-64 overflow-y-auto p-3 space-y-2">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded-lg text-sm max-w-[80%] ${
//                   msg.sender === "bot"
//                     ? "bg-gray-200 text-gray-800 self-start"
//                     : "bg-blue-600 text-white self-end ml-auto"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           <div className="p-3 border-t flex gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type a message..."
//               className="flex-1 border rounded-lg p-2 text-sm focus:outline-blue-500"
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//               onClick={handleSend}
//               className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);

    // Simulated bot reply (later you can connect API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Thanks for your message! Our doctor support will reply soon 🩺",
        },
      ]);
    }, 600);

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#5f6fff] text-white p-4 rounded-full shadow-lg hover:bg-[#4a56e2] transition"
          aria-label="Open chatbot"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[450px] bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-[#5f6fff] text-white px-4 py-3 flex justify-between items-center rounded-t-2xl">
            <h3 className="font-semibold text-base">Prescripto Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-lg hover:opacity-80"
              aria-label="Close chatbot"
            >
              ❌
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#f9faff]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm ${
                    msg.from === "user"
                      ? "bg-[#5f6fff] text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center border-t border-gray-300 px-3 py-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 text-sm outline-none px-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#5f6fff]"
            />
            <button
              type="submit"
              className="ml-2 bg-[#5f6fff] text-white px-3 py-2 rounded-lg hover:bg-[#4a56e2] transition"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
