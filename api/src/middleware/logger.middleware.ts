import pino from "pino";
import pinoHttp from "pino-http";
// import type { NextFunction, Request, Response } from "express";

const pinoLogger = pino();

export const logger = pinoHttp({ logger: pinoLogger });

// @TODO: configure logger
