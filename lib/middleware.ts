import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, extractTokenFromHeader } from "./auth"

export const authMiddleware = (handler: Function) => {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      const authHeader = req.headers.get("authorization")
      const token = extractTokenFromHeader(authHeader)

      if (!token) {
        return NextResponse.json({ error: "Access denied. No token provided." }, { status: 401 })
      }

      const decoded = verifyToken(token)

      // Add user info to request
      const requestWithUser = req as NextRequest & { user: any }
      requestWithUser.user = decoded

      return handler(requestWithUser, ...args)
    } catch (error) {
      return NextResponse.json({ error: "Invalid token." }, { status: 401 })
    }
  }
}

export const validateRequest = (schema: any) => {
  return (handler: Function) => {
    return async (req: NextRequest, ...args: any[]) => {
      try {
        const body = await req.json()
        const { error, value } = schema.validate(body)

        if (error) {
          return NextResponse.json(
            {
              error: "Validation error",
              details: error.details.map((d: any) => d.message),
            },
            { status: 400 },
          )
        }

        const requestWithValidatedBody = req as NextRequest & { validatedBody: any }
        requestWithValidatedBody.validatedBody = value

        return handler(requestWithValidatedBody, ...args)
      } catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
      }
    }
  }
}
