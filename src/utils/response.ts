/* eslint-disable @typescript-eslint/no-explicit-any */
export class ResponseUtil {
  static successResponse(res: any, data: any) {
    res.status(201).json({
      status: 201,
      success: true,
      message: 'Request successful',
      data
    });
  }

  static notFoundResponse(res: any, message: string) {
    res.status(404).json({
      status: 404,
      success: false,
      message: message,
    });
  }

  static badRequestResponse(res: any, message: string) {
    res.status(400).json({
      status: 400,
      success: false,
      message: message,
    });
  }

  static unauthorizedResponse(res: any, message: string) {
    res.status(401).json({
      status: 401,
      success: false,
      message: message,
    });
  }

  static internalServerErrorResponse(res: any, message: string) {
    res.status(500).json({
      status: 500,
      success: false,
      message: message,
    });
  }
}
