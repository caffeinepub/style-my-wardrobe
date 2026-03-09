// AUTO-GENERATED backend bindings

import type { Principal } from "@dfinity/principal";
import type { ActorMethod, ActorSubclass, ActorConfig } from "@dfinity/agent";
import { Actor, HttpAgent } from "@dfinity/agent";
import type { Identity } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";

// ── Candid Types ──────────────────────────────────────────────────────────────

export interface ClothingItem {
  id: bigint;
  name: string;
  color: string;
  category: string;
  occasions: Array<string>;
}

export interface OutfitSuggestion {
  description: string;
  items: Array<ClothingItem>;
}

export type UserRole =
  | { admin: null }
  | { user: null }
  | { guest: null };

export interface _SERVICE {
  _initializeAccessControlWithSecret: ActorMethod<[string], undefined>;
  addClothingItem: ActorMethod<
    [string, string, string, Array<string>],
    bigint
  >;
  assignCallerUserRole: ActorMethod<[Principal, UserRole], undefined>;
  deleteClothingItem: ActorMethod<[bigint], boolean>;
  getCallerUserRole: ActorMethod<[], UserRole>;
  getOutfitSuggestions: ActorMethod<[string], Array<OutfitSuggestion>>;
  getStyleTips: ActorMethod<[], Array<[string, string]>>;
  getWardrobe: ActorMethod<[], Array<ClothingItem>>;
  isCallerAdmin: ActorMethod<[], boolean>;
}

export type backendInterface = _SERVICE;

// ── IDL Factory ───────────────────────────────────────────────────────────────

export const idlFactory: IDL.InterfaceFactory = ({ IDL: I }) => {
  const UserRole = I.Variant({
    admin: I.Null,
    user: I.Null,
    guest: I.Null,
  });
  const ClothingItem = I.Record({
    id: I.Nat,
    name: I.Text,
    color: I.Text,
    category: I.Text,
    occasions: I.Vec(I.Text),
  });
  const OutfitSuggestion = I.Record({
    description: I.Text,
    items: I.Vec(ClothingItem),
  });
  return I.Service({
    _initializeAccessControlWithSecret: I.Func([I.Text], [], []),
    addClothingItem: I.Func(
      [I.Text, I.Text, I.Text, I.Vec(I.Text)],
      [I.Nat],
      [],
    ),
    assignCallerUserRole: I.Func([I.Principal, UserRole], [], []),
    deleteClothingItem: I.Func([I.Nat], [I.Bool], []),
    getCallerUserRole: I.Func([], [UserRole], ["query"]),
    getOutfitSuggestions: I.Func(
      [I.Text],
      [I.Vec(OutfitSuggestion)],
      ["query"],
    ),
    getStyleTips: I.Func(
      [],
      [I.Vec(I.Tuple(I.Text, I.Text))],
      ["query"],
    ),
    getWardrobe: I.Func([], [I.Vec(ClothingItem)], ["query"]),
    isCallerAdmin: I.Func([], [I.Bool], ["query"]),
  });
};

export const init: IDL.InterfaceFactory = ({ IDL: _I }) => {
  return _I.Service({});
};

// ── ExternalBlob ──────────────────────────────────────────────────────────────

export class ExternalBlob {
  private _url: string | null = null;
  private _bytes: Uint8Array | null = null;
  public onProgress?: (percentage: number) => void;

  private constructor() {}

  static fromURL(url: string): ExternalBlob {
    const blob = new ExternalBlob();
    blob._url = url;
    return blob;
  }

  static fromBytes(bytes: Uint8Array): ExternalBlob {
    const blob = new ExternalBlob();
    blob._bytes = bytes;
    return blob;
  }

  async getBytes(): Promise<Uint8Array> {
    if (this._bytes) return this._bytes;
    if (this._url) {
      const response = await fetch(this._url);
      const arrayBuffer = await response.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    }
    throw new Error("ExternalBlob has no data source");
  }

  getURL(): string | null {
    return this._url;
  }
}

// ── Actor Creation ─────────────────────────────────────────────────────────────

export interface CreateActorOptions {
  agentOptions?: {
    identity?: Identity;
    host?: string;
  };
  agent?: HttpAgent;
  processError?: (e: unknown) => never;
}

export function createActor(
  canisterId: string,
  _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  options?: CreateActorOptions,
): ActorSubclass<_SERVICE> {
  const agent =
    options?.agent ??
    new HttpAgent({
      ...options?.agentOptions,
    });

  const actorConfig: ActorConfig = {
    canisterId,
    agent,
  };

  return Actor.createActor<_SERVICE>(idlFactory, actorConfig);
}
