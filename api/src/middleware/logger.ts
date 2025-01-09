import pino from "pino";
import pinoHttp from "pino-http";
import type { NextFunction, Request, Response } from "express";

const logger = pino();

export const httpLogger = pinoHttp({ logger });

// @TODO: configure logger
