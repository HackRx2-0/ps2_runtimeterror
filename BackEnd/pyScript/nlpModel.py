from sklearn.feature_extraction.text import CountVectorizer
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import sys, json

# Method to drop rows


def main():
    # buffer input
    lines = sys.stdin.readlines()

    doc = lines[0]
   
    n_gram_range = (1, 1)
    stop_words = "english"

    # Extract candidate words/phrases
    count = CountVectorizer(ngram_range=n_gram_range, stop_words=stop_words).fit([doc])
    candidates = count.get_feature_names()
    model = SentenceTransformer("distilbert-base-nli-mean-tokens")
    doc_embedding = model.encode([doc])
    candidate_embeddings = model.encode(candidates)

    
    top_n = 5
    distances = cosine_similarity(doc_embedding, candidate_embeddings)
    keywords = [candidates[index] for index in distances.argsort()[0][-top_n:]]

  
    output = {"keywords": keywords}
    output = json.dumps(output)
    print(output)


if __name__ == "__main__":
    main()
