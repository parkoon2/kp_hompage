export const getIpFromRequest = (req) => {
    let IP =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress ||
        req.socket.remoteAddress || req.connection.socket.remoteAddress
    IP = IP.substr(IP.lastIndexOf(':') + 1)
    return IP
}