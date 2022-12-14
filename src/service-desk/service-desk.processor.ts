import { Job, Queue } from "bull";
import { Logger } from "@nestjs/common";
import { queueHelper } from "src/shared/utils";
import { Process, Processor } from "@nestjs/bull";
import { ServiceDeskService } from "./service-desk.service";
import { NewJiraTicketQueueMessage } from "src/shared/utils/jira/types";

@Processor(queueHelper.getQueueConfig().helpDesk.queueName)
export class ServiceDeskProcessor {
  constructor(private readonly serviceDeskService: ServiceDeskService) {}
  private readonly logger = new Logger(ServiceDeskProcessor.name);

  @Process(queueHelper.getQueueConfig().helpDesk.keys.createTicket)
  async handleMessage(job: Job) {
    const jiraTicketInfo = job.data as NewJiraTicketQueueMessage;
    this.serviceDeskService.createJiraTicket(jiraTicketInfo);
  }
}
