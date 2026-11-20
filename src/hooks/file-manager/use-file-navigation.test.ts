import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchFilesByPathApi, updateFolderViewApi } from "@/lib/api/file-manager";
import { useFileNavigation } from "./use-file-navigation";

vi.mock("@/lib/api/file-manager", () => ({
  fetchFilesByPathApi: vi.fn(),
  updateFolderViewApi: vi.fn(),
}));

vi.mock("./types", async importOriginal => ({
  ...(await importOriginal<typeof import("./types")>()),
  toast: vi.fn(),
}));

const fetchFiles = vi.mocked(fetchFilesByPathApi);
const updateView = vi.mocked(updateFolderViewApi);

function listResponse(pageSize: number, order = "updated_at", direction = "desc") {
  return {
    code: 200,
    message: "ok",
    data: {
      files: [],
      parent: { id: "folder-1", path: "anzhiyu://my/" },
      pagination: {},
      storage_policy: null,
      view: { view: "list", order, order_direction: direction, page_size: pageSize, columns: [] },
    },
  } as unknown as Awaited<ReturnType<typeof fetchFilesByPathApi>>;
}

async function renderLoadedNavigation() {
  const hook = renderHook(() => useFileNavigation({ current: null }));
  await act(async () => {
    await hook.result.current.loadFiles("/", true);
  });
  await waitFor(() => expect(hook.result.current.currentFolderId).toBe("folder-1"));
  return hook;
}

describe("useFileNavigation view settings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    updateView.mockResolvedValue(undefined as never);
  });

  // 回归：保存时曾读取尚未更新的 ref，导致把旧的 100 存回去，刷新后滑块弹回。
  it("saves the newly selected page size", async () => {
    fetchFiles.mockResolvedValue(listResponse(100));
    const { result } = await renderLoadedNavigation();

    fetchFiles.mockResolvedValue(listResponse(200));
    await act(async () => {
      await result.current.handleSetPageSize(200);
    });

    expect(updateView).toHaveBeenCalledTimes(1);
    expect(updateView.mock.calls[0][1]).toMatchObject({ page_size: 200 });
    await waitFor(() => expect(result.current.pageSize).toBe(200));
  });

  it("saves the newly selected sort key", async () => {
    fetchFiles.mockResolvedValue(listResponse(100));
    const { result } = await renderLoadedNavigation();

    fetchFiles.mockResolvedValue(listResponse(100, "name", "asc"));
    await act(async () => {
      await result.current.handleSetSortKey("name_asc");
    });

    expect(updateView.mock.calls[0][1]).toMatchObject({ order: "name", order_direction: "asc" });
  });

  it("saves the newly selected view mode", async () => {
    fetchFiles.mockResolvedValue(listResponse(100));
    const { result } = await renderLoadedNavigation();

    await act(async () => {
      await result.current.handleSetViewMode("grid");
    });

    expect(updateView.mock.calls[0][1]).toMatchObject({ view: "grid" });
  });
});
