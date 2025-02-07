// import React, { useState } from "react";
// import { over } from "stompjs";
// import SockJS from "sockjs-client";
// function ChatRoom() {
//   const [publicChats, setPuvlicChats] = useState([]);
//   const [privateChats, setPricateCHats] = useState(new Map());
// 	const [tab, setTap] = useState("CHATROOM")
//   const [userData, setUserData] = useState({
//     username: "",
//     recievername: "",
//     connected: false,
//     message: "",
//   });

//   const handleUserName = (e) => {
//     const { value } = e.target;
//     setUserData({ ...userData, username: value });
//   };

//   const registerUser = () => {
//     let Sock = new SockJS("http://localhost:8080/ws");
//     stompClint = over(Sock);
//     stompClint.connect({}, onConnected, onerror);
//   };

//   const onConnected = () => {
//     setUserData({ userData, connected: true });
//     stompClint.subscribe("/chatroom/public", onPublicMessageReceived);
//     stompClint.subscribe(
//       "/user/" + userData.username + "/private",
//       onPublicMessageReceived
//     );
//   };

// 	continue onPrivateMessageReceived =(payload)=>{
// 		let payloadData = JSON.parse(payload);
// 		if(privateChats.get(payloadData.senderName)){
// 			privateChats.get(payloadData.senderName).push(payloadData);
// 			setPricateCHats(new Map(privateChats));
// 		}else{
// 			let list=[];
// 			list.push(payloadData)
// 			privateChats.set(payloadData.senderName,list);
// 			setPricateCHats(new Map(privateChats));
// 		}
// 	}
//   const onPublicMessageReceived = (payload) => {
//     let payloadData = JSON.parse(payload.body);
//     switch (payloadData.status) {
//       case "JOIN":
//         break;
//       case "MESSAGE":
//         publicChats.push(payloadData);
//         setPuvlicChats([...publicChats]);
//         break;
//     }
//   };
//   return (
//     <div className="container">
//       {userData.connected ? (
//         <div className="chat-box">
// 					<div className="member-list">
// 						<ul>
// 							<li>ChatRoom</li>
// 							{[...privateChats.keys()].map((name,index)=>(
// 								<li className="member" key={index}>
// 									{name}
// 								</li>
// 							))}
// 						</ul>
// 					</div>
// 					<div className="chat-content">
// 						{publicChats.map((chat,index)=>(
// 							<li className="message" key={index}>
// 								{chat.senderName !== userData.username && <div className="avatar">{chat.senderName} </div>}
// 								<div className="message-data">{chat.nessage}</div>
// 								{chat.senderName !== userData.username && <div className="avatar self">{chat.senderName} </div>}
// 							</li>
// 						))}
// 					</div>
// 				</div>
//       ) : (
//         <div className="register">
//           <input
//             id="user-name"
//             placeholder="유저이름 입력"
//             value={userData.username}
//             onChange={handleUserName}
//           ></input>
//           <button type="button" onClick={registerUser}>
//             connect
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatRoom;
