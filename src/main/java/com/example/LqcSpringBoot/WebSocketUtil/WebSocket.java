package com.example.LqcSpringBoot.WebSocketUtil;

import com.google.gson.GsonBuilder;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@ServerEndpoint(value = "/websocket/{username}",configurator = com.example.LqcSpringBoot.WebSocketUtil.MySpringConfigurator.class)//, configurator = MySpringConfigurator.class这个地方经验证不需用加上否则多设备连接回发现两台以上设备连接 会造成下面的session变为同一个，造成其他设备推送失败，所以不要盲目复制别人的，要注意此处
@Component("WebSocket")
//@Component()
@Scope("prototype")
public class WebSocket {
    private static int onlineCount = 0;
    private static Map<String, Session> clients = new ConcurrentHashMap();
   // private static CopyOnWriteArraySet<WebSocket> clients = new CopyOnWriteArraySet<WebSocket>();
    @OnOpen
    public void onOpen(@PathParam("username") String username, Session session) throws IOException{
            addOnlineCount();
            clients.put(username, session);
            System.out.println("已连接" + getOnlineCount());
    }

    @OnClose
    public void onClose() throws IOException{
        clients.remove(this);
        subOnlineCount();
        System.out.println("已连接" + getOnlineCount());
    }

    @OnMessage
    public void onMessage(String message) throws IOException{

    }
    /**
     * 对象转json
     *
     * @param obj 对象
     * @return json字符串
     */
    public static String objToJson(Object obj) {
        return new GsonBuilder().serializeNulls().create().toJson(obj);
    }
    @OnError
    public void onError(Session session, Throwable error){
        error.printStackTrace();
    }

    /**
     * 指定发送者
     * @param message
     * @param To
     * @throws IOException
     */
    public static void sendMessageTo(String message, String To) throws IOException{
        Session session = clients.get(To);
        if (session!=null) {
            session.getAsyncRemote().sendText(message);
        }
    }
    /**
     * 所有人
     * @param message
     * @throws IOException
     */
    public static void sendMessageAll(String message){
            for (Session item : clients.values())
                {
                    item.getAsyncRemote().sendText(message);
                }
    }

    public static synchronized int getOnlineCount(){
        return onlineCount;
    }

    public static synchronized void addOnlineCount(){
        com.example.LqcSpringBoot.WebSocketUtil.WebSocket.onlineCount++;
    }

    public static synchronized void subOnlineCount(){
        com.example.LqcSpringBoot.WebSocketUtil.WebSocket.onlineCount--;
    }

}
