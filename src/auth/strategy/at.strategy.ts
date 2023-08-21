import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtATStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "wk1JDuH4OsKWLHVXam9vfvUC5bZf974zEeHXmxSOGYAOU2AJCQVIj8B0ZeoGMPi8ylAc5jpKb85HdOzQ5rM6gdqdUl4ZGWXUPl3SvuLoLn4WU0iV3J3",
    })
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username, fullname: payload.fullname, role: payload.role }
  }
}


