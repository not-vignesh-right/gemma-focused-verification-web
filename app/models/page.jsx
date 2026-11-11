export const metadata = { title: 'Models and data - Focused candidate verification' };

export default function Models() {
  return (
    <>
      <h1>Exact pins and inference setup</h1>
      <p className="lede narrow">
        The project compared inference-time selection procedures using existing models. It did not fine-tune Gemma or
        CodeRankEmbed, create a new checkpoint, train a new embedding model, generate repair patches or run repair
        tests &mdash; there is no project-trained model file to upload.
      </p>

      <h2>Gemma inference</h2>
      <div className="tablewrap">
        <table>
          <tbody>
            <tr><td>Model</td><td><a href="https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm">gemma-4-E2B-it-litert-lm</a> (litert-community)</td></tr>
            <tr><td>Pinned revision</td><td><code>3d48132a00cf76de57d926de30f5c5c5ed9b8c0d</code></td></tr>
            <tr><td>Weight file</td><td><code>gemma-4-E2B-it.litertlm</code></td></tr>
            <tr><td>Weight SHA256</td><td><code>181938105e0eefd105961417e8da75903eacda102c4fce9ce90f50b97139a63c</code></td></tr>
            <tr><td>Runtime</td><td>LiteRT LM 0.19.1 (wheel SHA256 <code>93db4308&hellip;8898</code>)</td></tr>
            <tr><td>Hardware</td><td>CPU only, two threads</td></tr>
            <tr><td>Context / ceilings</td><td>1,536-token context; 960 raw prompt ceiling; 12-token output ceiling</td></tr>
            <tr><td>Decoding</td><td>Top-k 1, top-p 1.0, temperature 0, seed 42, thinking disabled</td></tr>
            <tr><td>Per-call governor</td><td>1,500 MiB RSS and 90 seconds; numeric response and governor status stored separately</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Retrieval model</h2>
      <div className="tablewrap">
        <table>
          <tbody>
            <tr><td>Model</td><td><a href="https://huggingface.co/nomic-ai/CodeRankEmbed">nomic-ai/CodeRankEmbed</a> (137M)</td></tr>
            <tr><td>Pinned revision</td><td><code>3c4b60807d71f79b43f3c4363786d9493691f8b1</code></td></tr>
            <tr><td>Weight SHA256</td><td><code>827529bcd58aef0d9082e66eeff7e7d53a02f62bd005f841a26b3d3e2fb17ebe</code></td></tr>
            <tr><td>Configuration</td><td>FP32, normalized raw CLS, batch one, query limit 512, candidate limit 256, two CPU threads</td></tr>
            <tr><td>Pool</td><td>Lexical pool limited to 320 candidates; fusion selects 20. Bounded reranking, not exhaustive dense search.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Data</h2>
      <div className="tablewrap">
        <table>
          <tbody>
            <tr><td>Source</td><td><a href="https://huggingface.co/datasets/SWE-bench/SWE-bench">SWE-bench</a> full test</td></tr>
            <tr><td>Pinned revision</td><td><code>c6fe717fd7a4c3ac1daa4055a4fd082c6a1d28a2</code></td></tr>
            <tr><td>Captured parquet SHA256</td><td><code>d4f5a245c75319fa8240c540674958c4d491e82edf274b144d43836bdcbc4567</code></td></tr>
            <tr><td>Selected</td><td>12 resource-development + 60 evaluation tasks, six per repository across ten repositories</td></tr>
            <tr><td>Exclusions</td><td>All 323 Lite rows, 225 full-development rows, the 72 earlier-experiment tasks, and the entire Requests repository; near-duplicate pruning at Jaccard 0.8</td></tr>
          </tbody>
        </table>
      </div>
      <p className="small muted" style={{ marginTop: 10 }}>
        Raw issues, patches and source trees are not bundled; selected task IDs, repositories, base commits and input
        hashes are retained in the cohort metadata. Prior exclusions and duplicate checks are documented in the paper
        and captured qualification metadata; they do not establish globally unseen data or freedom from
        model-pretraining exposure.
      </p>

      <h2>Setting up an end-to-end rerun</h2>
      <p className="narrow">
        The offline checker in the evidence package runs anywhere with Python 3.10+ and no dependencies. The original
        scientific files are genuine source snapshots: they retain their original directory assumptions and expect
        files intentionally absent from the package &mdash; prepared source records, raw issue projection, patch and
        source archives, input prompt packs and call records, tokenizer caches, the model and runtime files, and the
        complete final output and label freezes. Some helper imports refer to their original project locations; the
        recovered scorer and window helpers are supplied separately for inspection.
      </p>
      <p className="narrow">
        A complete inference reproduction means restoring those inputs and dependencies, placing the original helper
        modules on their expected import paths (or explicitly documenting path-only adaptations), validating
        source, model and input hashes, preparing all records under the frozen protocol, and then running new CPU
        inference. Obtain upstream artifacts under their own terms and verify the hashes above rather than assuming a
        current default download is identical.
      </p>
    </>
  );
}
