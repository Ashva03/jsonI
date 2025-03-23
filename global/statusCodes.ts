export const statusCodes = {
  //   informational
  CONTINUE: 100, // Request received, client should continue
  SWITCHING_PROTOCOLS: 101, // Protocol switch (e.g., to WebSocket)
  PROCESSING: 102, // Processing for WebDAV (often not used in regular APIs)
  EARLY_HINTS: 103, // Provides hints before the full response is ready

  //   success
  OK: 200, // Request succeeded, returning content
  CREATED: 201, // Resource created (e.g., POST creation)
  ACCEPTED: 202, // Request accepted but not processed yet
  NON_AUTHORITATIVE_INFORMATION: 203, // Non-authoritative information (e.g., proxied data)
  NO_CONTENT: 204, // Request succeeded with no content to return
  RESET_CONTENT: 205, // Reset view (e.g., form clear after submit)
  PARTIAL_CONTENT: 206, // Partial content response for range requests
  MULTI_STATUS: 207, // Status for WebDAV multi-status
  ALREADY_REPORTED: 208, // Resource already reported (WebDAV)
  IM_USED: 226, // Indicates partial success (e.g., in instance control)

  //   redirection
  MULTIPLE_CHOICES: 300, // Multiple options for requested resource
  MOVED_PERMANENTLY: 301, // Resource moved permanently
  FOUND: 302, // Resource found at different URI temporarily
  SEE_OTHER: 303, // Redirect to a different URI
  NOT_MODIFIED: 304, // Resource not modified, cached version used
  USE_PROXY: 305, // Use proxy for request
  TEMPORARY_REDIRECT: 307, // Temporary redirect, URI will change
  PERMANENT_REDIRECT: 308, // Permanent redirect, URI will not change

  //   clientError
  BAD_REQUEST: 400, // Bad request, often validation failure
  UNAUTHORIZED: 401, // Unauthorized, authentication required
  PAYMENT_REQUIRED: 402, // Payment required (reserved for future use)
  FORBIDDEN: 403, // Forbidden, client lacks rights to access
  NOT_FOUND: 404, // Resource not found
  METHOD_NOT_ALLOWED: 405, // Method not allowed (e.g., GET on POST endpoint)
  NOT_ACCEPTABLE: 406, // Not acceptable content format requested
  PROXY_AUTHENTICATION_REQUIRED: 407, // Proxy authentication required
  REQUEST_TIMEOUT: 408, // Request timeout
  CONFLICT: 409, // Request conflicts with current state
  GONE: 410, // Resource gone, permanently removed
  LENGTH_REQUIRED: 411, // Content length required
  PRECONDITION_FAILED: 412, // Precondition in headers failed
  PAYLOAD_TOO_LARGE: 413, // Request entity too large
  URI_TOO_LONG: 414, // URI too long
  UNSUPPORTED_MEDIA_TYPE: 415, // Unsupported media type for the endpoint
  RANGE_NOT_SATISFIABLE: 416, // Range not satisfiable
  EXPECTATION_FAILED: 417, // Expectation in headers failed
  IM_A_TEAPOT: 418, // Easter egg response, "I'm a teapot"
  MISDIRECTED_REQUEST: 421, // Misrouted request
  UNPROCESSABLE_ENTITY: 422, // Unprocessable entity (validation issue)
  LOCKED: 423, // Resource locked
  FAILED_DEPENDENCY: 424, // Dependent operation failed
  TOO_EARLY: 425, // Early retry not advisable
  UPGRADE_REQUIRED: 426, // Client must update protocol
  PRECONDITION_REQUIRED: 428, // Preconditions required in headers
  TOO_MANY_REQUESTS: 429, // Too many requests (rate limiting)
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431, // Headers too large
  UNAVAILABLE_FOR_LEGAL_REASONS: 451, // Restricted access due to legal reasons

  //   serverError: {
  INTERNAL_SERVER_ERROR: 500, // Generic server error
  NOT_IMPLEMENTED: 501, // Server does not support requested functionality
  BAD_GATEWAY: 502, // Invalid response from upstream server
  SERVICE_UNAVAILABLE: 503, // Server unavailable, often temporary
  GATEWAY_TIMEOUT: 504, // Upstream server timeout
  HTTP_VERSION_NOT_SUPPORTED: 505, // Unsupported HTTP version
  VARIANT_ALSO_NEGOTIATES: 506, // Server cannot process due to internal issue
  INSUFFICIENT_STORAGE: 507, // Storage capacity exceeded
  LOOP_DETECTED: 508, // Recursive request loop detected
  NOT_EXTENDED: 510, // Further extensions required
  NETWORK_AUTHENTICATION_REQUIRED: 511, // Client must authenticate to use network
};
