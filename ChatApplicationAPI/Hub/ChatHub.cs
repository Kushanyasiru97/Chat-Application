using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ChatApplicationAPI.Hub
{
    public class ChatHub : Microsoft.AspNetCore.SignalR.Hub
    {
        private readonly IDictionary<string, UserRoomConnection> _connection;

        public ChatHub(IDictionary<string, UserRoomConnection> connection)
        {
            _connection = connection;
        }

        public async Task JoinRoom(UserRoomConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName: userConnection.Room);

            _connection[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync(method: "RecievedMessage", arg1:"Lets Program Bot", arg2:$"{userConnection.User} has Joined the Group");
            await sendConnectedUser(userConnection.Room);
        }

        public async Task sendMessage(string message)
        {
            if(_connection.TryGetValue(Context.ConnectionId, out UserRoomConnection userRoomConnection))
            {
                await Clients.Group(userRoomConnection.Room).SendAsync(method:"Recieved Message", arg1:userRoomConnection.User, arg2:DateTime.Now);
            }
        }

        public override Task OnDisconnectedAsync(Exception? exp)
        {
            if(!_connection.TryGetValue(Context.ConnectionId, out UserRoomConnection roomConnection))
            {
                return base.OnDisconnectedAsync(exp);
            }
            Clients.Group(roomConnection.Room!).SendAsync(method: "Recieved Message", arg1: "Lets Program Bot", arg2:$"{roomConnection.User} has Left the Group");
            sendConnectedUser(roomConnection.Room);
            return base.OnDisconnectedAsync(exp);
        }

        public Task sendConnectedUser(string room)
        {
            var users = _connection.Values
                                   .Where(u => u.Room == room)
                                   .Select(s => s.User)
                                   .ToList(); // Convert to list if Clients.Group requires a list, otherwise remove this line

            return Clients.Group(room).SendAsync("ConnectedUser", users);
        }
    }
}
