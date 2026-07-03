import { create } from '@bufbuild/protobuf';
import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import {
  GetDashboardRequestSchema,
  InfinderService,
  ListChannelsRequestSchema,
  ListContentsRequestSchema
} from '@/gen/infinder/v1/infinder_pb';

export const infinderApiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  (typeof window === 'undefined' ? 'https://fler.co.kr' : window.location.origin);

const transport = createConnectTransport({
  baseUrl: infinderApiBaseUrl
});

const infinderClient = createClient(InfinderService, transport);

export function getDashboard() {
  return infinderClient.getDashboard(create(GetDashboardRequestSchema, {}));
}

export function listChannels(input: {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
  minSubscribers?: bigint | number;
  maxSubscribers?: bigint | number;
  minAvgViews?: bigint | number;
  minTotalViews?: bigint | number;
  minPaidAdvertisingCount?: bigint | number;
  paidOnly?: boolean;
  videoSearch?: string;
}) {
  return infinderClient.listChannels(
    create(ListChannelsRequestSchema, {
      search: input.search ?? '',
      category: input.category ?? '',
      sort: input.sort ?? 'subscriber_count',
      page: input.page ?? 1,
      pageSize: input.pageSize ?? 30,
      minSubscribers: BigInt(input.minSubscribers ?? 0),
      maxSubscribers: BigInt(input.maxSubscribers ?? 0),
      minAvgViews: BigInt(input.minAvgViews ?? 0),
      minTotalViews: BigInt(input.minTotalViews ?? 0),
      minPaidAdvertisingCount: BigInt(input.minPaidAdvertisingCount ?? 0),
      paidOnly: input.paidOnly ?? false,
      videoSearch: input.videoSearch ?? ''
    })
  );
}

export function listContents(input: {
  search?: string;
  topic?: string;
  page?: number;
  pageSize?: number;
}) {
  return infinderClient.listContents(
    create(ListContentsRequestSchema, {
      search: input.search ?? '',
      topic: input.topic ?? '',
      page: input.page ?? 1,
      pageSize: input.pageSize ?? 12
    })
  );
}
