import { Injectable } from '@nestjs/common';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';
import { PolicyHandler } from './interfaces/policy-handler.interface';
import { Policy } from './interfaces/policy.interface';
import { PolicyHandlerStorage } from './policies-handlers.storage';

export class FrameworkContributorPolicy implements Policy {
  name = 'FrameworkContributor';
}

@Injectable()
export class FrameworkContributorPolicyHandler
  implements PolicyHandler<FrameworkContributorPolicy>
{
  constructor(private readonly polcyHandlerStorage: PolicyHandlerStorage) {
    this.polcyHandlerStorage.add(FrameworkContributorPolicy, this);
  }

  handle(
    policy: FrameworkContributorPolicy,
    user: ActiveUserData,
  ): Promise<void> {
    const isContributor = user.email.endsWith('@nestjs.com');
    if (!isContributor) {
      return Promise.reject(new Error('User is not a contributor'));
    }
    return Promise.resolve();
  }
}
