import { useEffect, useRef, useState } from "react";

export interface Options {
  reconnectLimit?: number;
  reconnectInterval?: number;
  onOpen?: (event: WebSocketEventMap["open"], instance: WebSocket) => void;
  onClose?: (event: WebSocketEventMap["close"], instance: WebSocket) => void;
  onMessage?: (
    message: WebSocketEventMap["message"],
    instance: WebSocket
  ) => void;
  onError?: (event: WebSocketEventMap["error"], instance: WebSocket) => void;
  protocols?: string | string[];
}

export interface Result {
  latestMessage?: WebSocketEventMap["message"];
  sendMessage?: WebSocket["send"];
  disconnect?: () => void;
  connect?: () => void;
  readyState: number;
  webSocketIns?: WebSocket;
  isMaxReconnect?:boolean
}
export default function useWebsocket(
  socketUrl: string,
  options: Options = {}
): Result {
  const {
    reconnectLimit = 3,
    reconnectInterval = 3 * 1000,
    onOpen,
    onClose,
    onMessage,
    onError,
    protocols,
  } = options;


  const onMessageRef = useRef(onMessage)

  const onOpenRef = useRef(onOpen)

  //   链接次数
  const reconnectTimesRef = useRef(0);
  //   重连定时器
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout>>();
  //   保存当前websocket链接信息
  const websocketRef = useRef<WebSocket>();

  //   websocket状态
  const [readyState, setReadyState] = useState<number>(0);

//   返回最后消息信息
  const [latestMessage,setLatestMessage] = useState< MessageEvent<any>>()

  // 是否最大连接次数
  const [isMaxReconnect,setIsMaxReconnect] = useState<boolean>(false)

  //   重连
  const reconnect = () => {
    console.log(`*** ws-reconnect(${reconnectTimesRef.current}) ***`)
    if (reconnectTimesRef.current < reconnectLimit) {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      reconnectTimerRef.current = setTimeout(() => {
        connect();
        reconnectTimesRef.current++;
      }, reconnectInterval);
    } else {
      setIsMaxReconnect(true)
    }
  };

  const connect = () => {

    // 创建
    const ws = new WebSocket(socketUrl, protocols);

    // 打开链接
    ws.onopen = (event) => {
      onOpenRef.current?.(event, ws)
      //   打开初始化链接次数
      reconnectTimesRef.current = 0;
      setIsMaxReconnect(false)
      setReadyState(ws.readyState);
    };
    // 接收消息
    ws.onmessage = (message: MessageEvent<any>) => {
    //   onMessage && onMessage(message, ws);
      onMessageRef.current?.(message,ws)
      setReadyState(ws.readyState);
      setLatestMessage(message)
    };
    // 关闭连接
    ws.onclose = (event) => {
      onClose && onClose(event, ws);
      console.log('--|||||---')
      if(reconnectTimesRef.current >= 0){
        // 主动断开值为 -1
        reconnect();
      }
      setReadyState(ws.readyState);
    };
    // 异常信息
    ws.onerror = (event) => {
      onError && onError(event, ws);
      if(reconnectTimesRef.current >= 0){
        // 主动断开值为 -1
        reconnect();
      }
      setReadyState(ws.readyState);
    };

    websocketRef.current = ws;
  };
  // 发送信息
  const sendMessage = (
    data: string | ArrayBufferLike | Blob | ArrayBufferView
  ) => {
    if (readyState == WebSocket.OPEN) {
      websocketRef.current?.send(data);
    } else {
      throw new Error("WebSocket disconnect!!!");
    }
  };

  //   断开连接
  const disconnect = () => {
    if (reconnectTimerRef.current) {
      // 关闭定时器
      clearTimeout(reconnectTimerRef.current);
    }
    // 主动关闭设置 -1
    reconnectTimesRef.current = -1;
    // 关闭连接
    websocketRef.current?.close();
  };

  useEffect(() => {
    // 初始化次数
    reconnectTimesRef.current = 0;
    //   创建链接
    connect();
    return () => {
      disconnect()
    }
  }, [socketUrl]);

  return {
    latestMessage,
    sendMessage,
    disconnect,
    connect,
    readyState,
    isMaxReconnect
  };
}
