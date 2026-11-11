export const metadata = { title: 'Method - Focused candidate verification' };

export default function Method() {
  return (
    <>
      <h1>How the study is built</h1>
      <p className="lede narrow">
        A controlled, resource-bounded comparison of selection procedures over the same candidate set, with strict
        patch-to-source scoring and recoverable numeric evidence. Frozen before evaluation: the cohort, the code, the
        rankings, the prompts, the model and every scientific hash.
      </p>

      <h2>Task: localization, not repair</h2>
      <p className="narrow">
        Issue localization selects code relevant to a reported software problem. Given a SWE-bench issue, each method
        must choose an existing class or function from the pre-patch source. No patch is generated and no repair test
        is run. The prespecified primary comparison is V20 minus T20 on exact class-inclusive existing-definition
        choice, with all 60 tasks in the denominator.
      </p>

      <h2>Cohort: deterministic selection with exclusions</h2>
      <p className="narrow">
        The source is SWE-bench full test at pinned revision <code>c6fe717f</code>. The selection excludes all 323
        Lite rows, all 225 full-development rows and all 72 tasks from the preceding experiment, by task IDs, base
        commits, exact queries and token-set Jaccard similarity at 0.8. The entire Requests repository is
        conservatively excluded because of an older withdrawn experiment. Eligible tasks are ordered by SHA256 of a
        fixed prefix and task ID, pruned for within-pool near-duplicates, then assigned by repository round-robin:
        12 resource-development tasks and 60 evaluation tasks, six per repository across ten repositories. No gold
        label, outcome or source-availability criterion selects or replaces tasks. A separate qualification audit
        checks 44,640 prior-cohort comparisons and 2,556 within-selected pairs.
      </p>

      <h2>Retrieval: one shared bounded pool</h2>
      <p className="narrow">
        Pre-patch Python source supplies module, class and function nodes; duplicate qualified names retain the first
        inventory entry and are reported. Fielded lexical retrieval weights names and paths by two, bodies by one,
        with a 0.5 test prior. Only the first 320 lexical candidates are embedded: CodeRankEmbed 137M, normalized raw
        CLS, FP32, batch one, query limit 512 and candidate limit 256 tokens. Lexical and dense ranks combine by
        equal-channel reciprocal-rank fusion, constant 60, into a shortlist of 20 with canonical-symbol ties. This is
        bounded reranking, not dense search of the entire repository, and no structural rescue is used.
      </p>

      <h2>The four selection procedures</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Method</th><th>Selection from the shared candidates</th><th className="num">Calls / task</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>V20</strong></td>
              <td>One candidate per prompt; fixed 0&ndash;3 relevance rubric; highest score wins. Ties follow original semantic rank, then symbol. All-zero or all-invalid scores abstain.</td>
              <td className="num">20</td>
            </tr>
            <tr>
              <td><strong>T20</strong></td>
              <td>Four five-call tournaments over the same shortlist, with fixed left rotations 0, 1, 2 and 3. Most frequent non-null winner wins; ties follow original rank, then symbol.</td>
              <td className="num">20</td>
            </tr>
            <tr>
              <td><strong>T5</strong></td>
              <td>Rotation zero of T20, reused rather than called again: four groups of five, then a final choice among winners.</td>
              <td className="num">5</td>
            </tr>
            <tr>
              <td><strong>Dense1</strong></td>
              <td>Top dense-cosine candidate in the bounded lexical pool. No Gemma selection calls.</td>
              <td className="num">0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="narrow" style={{ marginTop: 14 }}>
        The V20 rubric is fixed: <strong>0</strong> no plausible edit relevance; <strong>1</strong> related concept
        with weak edit evidence; <strong>2</strong> plausible edit site tied to the described behavior;
        <strong>3</strong> direct evidence that this definition implements the failing behavior and likely needs
        editing. Only a single digit is accepted; invalid responses rank below zero. Tournaments distribute the
        ordered shortlist round-robin into four groups; a numeric zero or invalid response creates no winner. No
        threshold, calibration, rubric or ranking rule changed after evaluation.
      </p>

      <h2>Prompt budgets and the resource gate</h2>
      <p className="narrow">
        All prompts share the same issue prefix. Tournaments start with a source allowance of 128 tokens per
        candidate; V20 starts at 640 for one candidate. Both use the same query-window source selector with a 12-line
        window, shrink the allowance by eight to fit, and stay within 960 raw prompt tokens. The shared issue
        allowance begins at 256 and shrinks only if required. A separate packing audit checks all 2,592 prepared
        prompts, candidate membership, rotations, hashes and shared issue text. Equal call counts do not mean equal
        token exposure or compute: this is a whole-procedure comparison, not a causal isolation of excerpt length.
      </p>
      <p className="narrow">
        Pinned Gemma 4 E2B runs with LiteRT 0.19.1 on two CPU threads: context 1,536, output ceiling 12, top-k one,
        temperature zero, seed 42, thinking disabled. Each process is limited to 1,500&nbsp;MiB RSS and 90 seconds by
        a governor wrapper; embeddings run in sequential chunks of at most 64 under the same limits. No GPU, paid
        API, training or repository-code execution is used anywhere in the study.
      </p>

      <h2>Strict scoring and the independent audit</h2>
      <p className="narrow">
        Each old patch hunk must uniquely match its complete context in the pre-patch source. Removed lines map to
        the innermost existing definition; pure insertions map only when both old neighbors belong to the same
        definition. New files, unresolved hunks, duplicate qualified definitions and outside-definition edits produce
        no guessed target &mdash; tasks without a strict target score zero. Fifty-six tasks have a mapped
        class-inclusive target, 55 a function target, four contain duplicate-symbol ambiguity and eight hunks are
        unresolved. A separate audit implementation reconstructs all 60 label sets, 2,400 response decisions,
        rotations, ordinal rankings and paired intervals, and checks 52,284 Python-file hashes. It agrees with the
        evaluator &mdash; independent logic over the same evidence, not an external replication.
      </p>
      <p className="narrow">
        Uncertainty uses 10,000-draw paired task bootstraps (seed 42) and repository-cluster bootstraps (seed 43).
        These are descriptive intervals over a selected public-benchmark sample, not a population-random experiment.
      </p>

      <h2>What came before: a negative result that motivated the design</h2>
      <p className="narrow">
        An earlier completed replacement experiment (12 development tasks, 192 calls; 60 evaluation tasks, 960
        calls) tested structural rescue: it scored 14/60 against a matched semantic baseline&rsquo;s 16/60, with a
        task interval of [&minus;13.33, +5.00] points. That negative result is unchanged, and it suggested examining
        final selection rather than treating candidate coverage as success. The present protocol and separate cohort
        were frozen before new evaluation; the earlier outcomes are not pooled into the new estimate.
      </p>

      <h2>References</h2>
      <p className="ref">[1] Reddy et al. <em>SweRank: Software Issue Localization with Code Ranking.</em> <a href="https://arxiv.org/html/2505.07849">arxiv.org/html/2505.07849</a></p>
      <p className="ref">[2] Suresh et al. <em>CoRNStack: High-Quality Contrastive Data for Better Code Retrieval and Reranking.</em> <a href="https://arxiv.org/html/2412.01007">arxiv.org/html/2412.01007</a></p>
      <p className="ref">[3] Nomic AI. <em>CodeRankEmbed model card.</em> <a href="https://huggingface.co/nomic-ai/CodeRankEmbed/raw/main/README.md">huggingface.co/nomic-ai/CodeRankEmbed</a></p>
      <p className="ref">[4] Xia et al. <em>Agentless: Demystifying LLM-based Software Engineering Agents.</em> <a href="https://arxiv.org/html/2407.01489">arxiv.org/html/2407.01489</a></p>
      <p className="ref">[5] Chen et al. <em>LocAgent: Graph-Guided LLM Agents for Code Localization.</em> <a href="https://aclanthology.org/2025.acl-long.426/">aclanthology.org/2025.acl-long.426</a></p>
      <p className="ref">[6] Bellam. <em>How Do Small Coding Agents Use Code Graphs and Embeddings?</em> <a href="https://arxiv.org/html/2610.33958">arxiv.org/html/2610.33958</a></p>
      <p className="ref">[7] SWE-bench pinned test data. <a href="https://huggingface.co/datasets/SWE-bench/SWE-bench/resolve/c6fe717fd7a4c3ac1daa4055a4fd082c6a1d28a2/data/test-00000-of-00001.parquet">pinned full-test parquet</a></p>
      <p className="ref">[8] CodeSage. <em>CodeSage-small-v2 model card.</em> <a href="https://huggingface.co/codesage/codesage-small-v2">huggingface.co/codesage/codesage-small-v2</a></p>
      <p className="ref">[9] Reddy et al. <em>SweRank+: Multilingual, Multi-Turn Code Ranking for Software Issue Localization.</em> <a href="https://arxiv.org/html/2512.20482">arxiv.org/html/2512.20482</a></p>
      <p className="ref">[10] Qwen. <em>Qwen3-Embedding-0.6B model card.</em> <a href="https://huggingface.co/Qwen/Qwen3-Embedding-0.6B">huggingface.co/Qwen/Qwen3-Embedding-0.6B</a></p>
    </>
  );
}
